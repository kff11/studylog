import React, { useState } from 'react';
import { DiaryItem } from "../components/index";

const DiaryList= ({diaries}) => {

    const diaryList = diaries.map( ({id, title, date}) => (
        <DiaryItem
            id={id}
            title={title}
            date={date}
            key={id + title}
        />
    )
    );


    return(
        <div>
            {diaryList}
        </div>
    );
}

export default React.memo(DiaryList);