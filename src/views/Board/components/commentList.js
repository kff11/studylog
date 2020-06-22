import React, {useState} from 'react';
import {CommentItem} from "./index";

const CommentList = ({comments, getComments, loginId}) => {
    // {id, username, contents, date}
    const commentList = comments.map(({id, user_id, user_name, contents, date}) => (
            <CommentItem
                id={id}
                user_name={user_name}
                contents={contents} //댓글 내용
                date={date} //댓글 쓴 날짜
                verify={!(user_id === loginId) ? true : false}
                getComments={getComments}
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