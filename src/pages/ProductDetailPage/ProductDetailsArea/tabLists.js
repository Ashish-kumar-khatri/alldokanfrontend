import Description from './Description';
import Comments from './Comments';
import Location from './Location';

const tabs = [
    {
        title : 'Description',
        component : <Description />
    },
    {
        title : 'Comments',
        component : <Comments />
    },
    {
        title : 'Location',
        component : <Location />
    }
]

export default tabs;