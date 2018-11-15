import BlogStore from './blog'
import userStore from './user'


console.log(new BlogStore())

export default {
  blogStore: new BlogStore(),
  userStore: new userStore(),
}
