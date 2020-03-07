import BlogStore from './blog'
import UserStore from './user'
import ViewRecordStore from './view-record'
import ChatStore from './chat'

export default {
  blogStore: new BlogStore(),
  userStore: new UserStore(),
  viewRecordStore: new ViewRecordStore(),
  chatStore: new ChatStore()
}
