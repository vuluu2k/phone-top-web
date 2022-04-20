import React from 'react';
import { Input } from 'antd';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { Admin } from 'components/layouts';
import { TableCustom } from 'components/Common';
export default function BlogManager() {
  return (
    <Admin title="Quản lí tin tức">
      <TableCustom title="Đăng tin tức mới">
        <Input name="title" placeholder="Nhập tiêu đề tin tức của bạn" />
        <div style={{ marginBottom: 16 }}>
          <Editor
            // editorState={description}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            // onEditorStateChange={onEditorStateChange}
            editorStyle={{ height: 'calc(100vh - 500px)', border: '1px solid #CED4DA', borderRadius: '0.2em' }}
          />
        </div>
      </TableCustom>
    </Admin>
  );
}
