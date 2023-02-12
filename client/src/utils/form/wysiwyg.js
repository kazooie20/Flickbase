import React from "react";
import {htmlDecode} from '../tools'
//WYSIWYG
import { EditorState, ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import '../../styles/react-draft-wysiwyg.css'

//EDIT
import htmlToDraft from 'html-to-draftjs'

const WYSIWYG = (props) => {
    const [editorData, setEditorData] = React.useState({
        editorState: EditorState.createEmpty()
    })

    const onEditorStateChange = (editorData) => {
        let HTMLdata = stateToHTML(editorData.getCurrentContent())
        setEditorData({
            editorState: editorData
        })
        props.setEditorState(HTMLdata)


    }

    React.useEffect(()=>{
        if (props.editorContent) {
            const blockFromHtml = htmlToDraft(htmlDecode(props.editorContent));
            const { contentBlocks, entityMap } = blockFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            setEditorData({
                editorState: EditorState.createWithContent(contentState)
            });
            // console.log(blockFromHtml);
        }
        // console.log(htmlDecode(props.editorContent));

    },[props.editorContent])

    const checkError = () => {
        if (props.onError || (props.onError && props.editorBlur)) {
            return true;
        }
        return false
    }

    return (
        <div>
            <Editor editorState={editorData.editorState} onEditorStateChange={onEditorStateChange} wrapperClassName={`demo-wrapper ${checkError() ? 'Error' : ''}`} editorClassName='demo-editor' onBlur={props.setEditorBlur} />
        </div>
    )
}

export default WYSIWYG;