import React, {useState} from 'react';
import {CommentItem} from "./index";

const CommentList = ({comments}) => {
    //{id, username, contents, date}
    const commentList = comments.map((comment) => (
            <CommentItem
                id={comment.id} //id
                username={comment.username}
                contents={comment.contents} //댓글 내용
                date={comment.date} //댓글 쓴 날짜
                key={comment.id}
            />
        )
    );


    return (
        <div>
            {commentList}
        </div>
    );
}

export default React.memo(CommentList);