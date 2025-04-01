import React from 'react'

const Box = (props) => {
    const {title,item,result} = props;

    return (
        <div className={`box ${result}`}>
            <h1>{title}</h1>
            <img className='item-img' src={item && item.img}/>
            <h2 className={`result-text ${result}`}>{result}</h2>
        </div>
    )
}

export default Box