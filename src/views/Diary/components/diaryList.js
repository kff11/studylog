import React, {useState} from 'react';
import {DiaryItem} from "./index";

const DiaryList = ({diaries}) => {

    const diaryList = diaries.map(({id, title, contents, date}) => (
            <DiaryItem
                id={id}
                contents={contents}
                title={title}
                date={date}
            />
        )
    );


    return (
        <div>
            {diaryList}
        </div>
    );
}

export default React.memo(DiaryList);