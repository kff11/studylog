import React from 'react';
import {CommentItem} from "./index";

const CommentList = ({comments, loginId, delComment}) => {
    // {id, username, contents, date}
    const commentList = comments.map(({id, user_id, user_name, contents, date, avatar}) => (
            <CommentItem
                id={id}
                user_name={user_name}
                contents={contents} //댓글 내용
                date={date} //댓글 쓴 날짜
                verify={!(user_id === loginId) ? true : false}
                avatar={avatar}
                delComment={delComment}
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