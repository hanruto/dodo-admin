import BlogStore from './blog'
import UserStore from './user'
import ViewRecordStore from './view-record'

export default {
  blogStore: new BlogStore(),
  userStore: new UserStore(),
  viewRecordStore: new ViewRecordStore()
}
