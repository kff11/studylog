import React, {useState} from 'react';
import {CommentItem} from "./index";

const CommentList = ( {comments} ) => {
    // {id, username, contents, date}
    const commentList = comments.map(({id,username,contents,date}) => (
                <CommentItem
                    username={username}
                    contents={contents} //댓글 내용
                    date={date} //댓글 쓴 날짜
                    key={id}
                />
        )
    );


    return (
        <div>
            {commentList}
        </div>

    );
}

export default CommentList;