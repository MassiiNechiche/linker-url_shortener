import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "../axios";

function Link({ shorten, full, update }) {
  const deleteUrl = () => {
    axios.delete("/", { data: { id: shorten } }).then((res) => update);
  };

  return (
    <div className="link">
      <CopyToClipboard
        text={`http://localhost:5000/${shorten}`}
        className="copy"
      >
        <InsertLinkIcon className="icon" />
      </CopyToClipboard>
      <span className="cluster">
        <span className="new">{`http://localhost:5000/${shorten}`}</span>
        <span className="old">{full}</span>
      </span>
      <div className="remove" onClick={deleteUrl}>
        <DeleteForeverIcon />
      </div>
    </div>
  );
}

export default Link;
