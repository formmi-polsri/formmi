import React from "react";

export default function TagsInput({ tags, onKeyUp, onClick }) {
    return (
        <div>
            <label htmlFor="tags" className={``}>Tags</label>
            <div className={`input flex gap-1 mt-2`}>
                {tags.map(tag => (
                    <span key={tag.id} className={`tags`}>
                        <span>{tag.name}</span>
                        <span
                            onClick={() => onClick(tag.id)}
                            className={`inline ml-1 cursor-pointer text-primary-blue`}
                        >
                            &times;
                        </span>
                    </span>
                ))}
                <input type="text" id="tags" className="w-full outline-none" onKeyUp={onKeyUp} placeholder="Enter tags diskusi..." />
            </div>
        </div>
    )
}