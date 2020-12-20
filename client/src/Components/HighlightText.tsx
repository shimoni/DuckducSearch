import React from "react";

interface Props {
    text: string
    searchTerm: string
}

export default function HighlightText({searchTerm, text}: Props) {
    const parts = text.toLocaleLowerCase().replaceAll(searchTerm, `<mark>${searchTerm}</mark>`)
    return (
        <span
            dangerouslySetInnerHTML={{
                __html: parts
            }}/>
    )
}
