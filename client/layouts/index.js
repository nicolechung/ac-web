import { withProps } from 'recompose'
import Feed from './Feed'

export Ast from './Ast'
export Map from './Map'
export AtesMap from './AtesMap'
export Root from './Root'
export Weather from './Weather'
export Tutorial from './Tutorial'

export const NewsFeed = feed('news', 'Recent news')
export const BlogFeed = feed('blog', 'Blogs')
export const EventFeed = feed('event', 'Events')

function feed(type, title) {
    return withProps({
        type,
        title,
    })(Feed)
}
