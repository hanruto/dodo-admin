import React from 'react';
import { Button, Icon, Modal, Input, Form } from 'antd';
import {
    Entity,
    Editor,
    EditorState,
    RichUtils,
    getDefaultKeyBinding,
    AtomicBlockUtils,
    CompositeDecorator,
    ContentState,
    convertFromHTML
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

let stateToHtmlOption = {
    inlineStyles: {
        RED: {
            style: { color: '#f22' }
        },
        BLUE: {
            style: { color: '#39f' }
        }
    },
    blockStyleFn: (block) => {
        switch (block.getType()) {
            case 'blockquote':
                return {
                    style: {
                        background: '#f3f3f3',
                        color: '#666',
                        borderLeft: '10px solid #ccc',
                        padding: '5px 10px',
                        fontSize: '16px'
                    }
                }; break;
            case 'code-block':
                return {
                    style: {
                        background: '#f3f3f3',
                        lineHeight: '20px',
                        padding: '15px'
                    }
                }; break;
                
            default: return null;
        }
    },
    defaultBlockTag: 'div'
};

// 默认的行内样式
let defaultInlineStyle = [
    { el: <span style={{ fontWeight: "bold" }}>B</span>, style: 'BOLD' },
    { el: <span style={{ fontStyle: "italic" }}>I</span>, style: 'ITALIC' },
    { el: <span style={{ textDecoration: "underline" }}>U</span>, style: 'UNDERLINE' },
    { el: <span><div className="color-show" style={{ backgroundColor: '#e24' }}></div></span>, style: 'RED' },
    { el: <span><div className="color-show" style={{ backgroundColor: '#39f' }}></div></span>, style: 'BLUE' },
    { el: <span><div className="color-show" style={{ backgroundColor: '#f93' }}></div></span>, style: 'ORANGE' },
    { el: <span><div className="color-show" style={{ backgroundColor: '#3a6' }}></div></span>, style: 'GREEN' }
];

// 自定义行内样式
let customColorStyleMap = {
    'RED': { color: '#e24' },
    'BLUE': { color: '#39f' },
    'ORANGE': { color: '#f93' },
    'GREEN': { color: '#3a6' }
};

let customStyleMap = Object.assign({}, customColorStyleMap);

// 这些是用于默认映射标签和类型的对应关系
let defaultBlockType = [
    { el: 'H1', type: 'header-one' },
    { el: 'H2', type: 'header-two' },
    { el: 'H3', type: 'header-three' },
    { el: 'H4', type: 'header-four' },
    { el: 'H5', type: 'header-five' },
    { el: 'H6', type: 'header-six' },
    { el: 'PRE', type: 'blockquote' },
    { el: '</>', type: 'code-block' },
    { el: <Icon type="bars" />, type: 'ordered-list-item' },
    { el: <Icon type="profile" />, type: 'unordered-list-item' },
    { el: <Icon type="sync" />, type: 'unstyled' }
];

// 样式和css className对应表
let getBlockStyle = (content) => {
    switch (content.getType()) {
        case 'blockquote':
            return 'editor-blockquote'; break;
        case 'code-block':
            return 'editor-code-block'; break;
        case 'header-one':
            return 'editor-header-one'; break;
        default:
            return null;
    }
}

let blockRendererMap = {
    'red': {
        element: 'span'
    }
}
let blockRendererFn = (content) => { };

let customKeyBindFn = (e) => {
    return getDefaultKeyBinding(e);
}

function stratetyCreater(type) {
    return (contentBlock, callback) => {
        contentBlock.findEntityRanges(
            (character) => {
                const entityKey = character.getEntity();
                return (entityKey !== null && Entity.get(entityKey).getType() === type);
            },
            callback
        );
    }
}

const Link = (props) => {
    const { href } = Entity.get(props.entityKey).getData();
    return <a href={href}>{props.children}</a>;
};

const Image = (props) => {
    const { src } = Entity.get(props.entityKey).getData();
    return <img className="img-responsive" src={src} />;
};

const Video = (props) => {
    const { src } = Entity.get(props.entityKey).getData();
    return <video style={{ maxWidth: '100%' }} src={src} controls="controls" />;
}

const decorator = new CompositeDecorator([
    { strategy: stratetyCreater('LINK'), component: Link, },
    { strategy: stratetyCreater('IMAGE'), component: Image },
    { strategy: stratetyCreater('VIDEO'), component: Video }
]);

export default class DraftEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullScreen: false,
            linkInputVisible: false,
            editorState: EditorState.createEmpty(decorator)
        };
        this.onChange = editorState => {
            let content = editorState.getCurrentContent();
            this.props.onChange(stateToHTML(content, stateToHtmlOption));
            this.setState({ editorState });
        };
        this.focus = this.focus.bind(this);
        this.pasteImage = this.pasteImage.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.createImageEntity = this.createImageEntity.bind(this);
        this.createLinkEntity = this.createLinkEntity.bind(this);
        this.createVideoEntity = this.createVideoEntity.bind(this);
    }

    componentWillMount() {
        if (this.props.content) {
            const blocksFromHTML = convertFromHTML(this.props.content);
            const state = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap,
            );
            this.setState({ editorState: EditorState.createWithContent(state, decorator) });
        }
    }

    toggleInlineStyle(style) {
        if (customColorStyleMap[style]) {
            let inlineStyle = this.state.editorState.getCurrentInlineStyle();
        }

        let state = RichUtils.toggleInlineStyle(this.state.editorState, style);
        this.onChange(state);
    }

    toggleBlockType(type) {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, type));
    }

    pasteImage(files) {
        const { editorState } = this.state;
        let _self = this;
        for (var i = 0; i < files.length; i++) {
            if (files[i].type.indexOf("image") !== -1) {
                var blob = files[i];
                let reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function () {
                    let base64data = reader.result;
                    _self.createImageEntity(base64data);
                }
            }
        }
    }

    focus(e) {
        if (e.target.getAttribute('name') === 'editor-wraper' && !this.state.editorState.getSelection) {
            this.setState({ editorState: EditorState.moveFocusToEnd(this.state.editorState) });
        }
    }

    handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    showURLInput(type, callback) {
        this.setState({
            linkInputVisible: true,
            linkInputCallback: callback
        });
    }

    createImageEntity(src) {
        const { editorState } = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('IMAGE', 'MUTABLE', { src });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        this.setState({ editorState: AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ') });
    }

    createVideoEntity(src) {
        const { editorState } = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('VIDEO', 'MUTABLE', { src });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        this.setState({ editorState: AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ') });
    }

    createLinkEntity(href) {
        const { editorState } = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { href });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        this.setState({ editorState: RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey) });
    }

    render() {
        let editorState = this.state.editorState;
        let inlineStyle = editorState.getCurrentInlineStyle();
        let blockType = RichUtils.getCurrentBlockType(this.state.editorState);
        return (
            <div className={this.state.fullScreen ? "draft-editor-full" : "draft-editor"}>
                <div>
                    <div className="editor-header">
                        <div className="editor-btn-group">
                            <span className="editor-btn" onClick={e => this.setState({ editorState: EditorState.undo(this.state.editorState) })}>
                                <Icon type="rollback" />
                            </span>
                            <span className="editor-btn" onClick={e => this.setState({ editorState: EditorState.redo(this.state.editorState) })}>
                                <Icon type="rollback" style={{ transform: "rotateY(180deg)" }} />
                            </span>
                        </div>
                        <div className="editor-btn-group">
                            {defaultInlineStyle.map(item =>
                                <span onClick={() => this.toggleInlineStyle(item.style)}
                                    className={"editor-btn " + (inlineStyle.includes(item.style) ? 'active' : 'inactive')} key={item.style}>
                                    {item.el}
                                </span>)}
                        </div>
                        <div className="editor-btn-group">
                            {defaultBlockType.map(item =>
                                <span onClick={() => this.toggleBlockType(item.type)}
                                    className={"editor-btn " + (blockType === item.type && blockType !== 'unstyled' ? 'active' : 'inactive')}
                                    key={item.type}>
                                    {item.el}
                                </span>)}
                        </div>
                        <div className="editor-btn-group">
                            <span className="editor-btn"
                                onClick={e => this.showURLInput('link', this.createLinkEntity)}><Icon type="link" /></span>
                            <span className="editor-btn"
                                onClick={e => this.showURLInput('img', this.createImageEntity)}><Icon type="picture" /></span>
                            <span className="editor-btn"><Icon type="notification" /></span>
                            <span className="editor-btn"
                                onClick={e => this.showURLInput('video', this.createVideoEntity)}><Icon type="video-camera" /></span>
                            {!this.state.fullScreen && <span className="editor-btn" onClick={e => this.setState({ fullScreen: true })}><Icon type="arrows-alt" /></span>}
                            {this.state.fullScreen && <span className="editor-btn" onClick={e => this.setState({ fullScreen: false })}><Icon type="shrink" /></span>}
                        </div>
                    </div>
                    <div className={this.state.fullScreen ? "editor-content-full" : "editor-content"} name="editor-wraper"
                        onClick={this.focus}>
                        <Editor
                            // basic config
                            spellCheck={true}
                            editorState={editorState}

                            // event
                            onChange={this.onChange}
                            onPaste={(value) => (console.log('paste', value))}
                            handlePastedFiles={this.pasteImage}
                            handleDroppedFiles={this.pasteImage}

                            // style
                            blockRendererFn={blockRendererFn}
                            blockStyleFn={getBlockStyle}
                            customStyleMap={customStyleMap}
                            blockRendererMap={blockRendererMap}

                            // key bind
                            keyBindingFn={customKeyBindFn}
                            handleKeyCommand={this.handleKeyCommand}
                        />
                    </div>
                </div>
                <Modal
                    visible={this.state.linkInputVisible}
                    title="link"
                    onCancel={e => this.setState({ linkInputVisible: false })}
                    onOk={e => { this.state.linkInputCallback(this.urlValue); this.setState({ linkInputVisible: false }) }}
                >
                    <Input onChange={e => this.urlValue = e.target.value} />
                </Modal>
            </div>
        )
    }
}