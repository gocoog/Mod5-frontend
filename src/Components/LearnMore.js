import React from 'react'
import videos from '../video_data'
import VideoPage from './VideoPage'

const LearnMore = () => {

    return(
        <div>
        {videos.map(video => 
            <VideoPage video={video} />
            )}
        </div>
    )
}

export default LearnMore