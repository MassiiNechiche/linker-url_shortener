import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import LinkIcon from "@material-ui/icons/Link";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Link from "./Link";
import axios from "../axios";

function Core({ myId }) {
  const [url, setUrl] = useState();
  const [short, setShort] = useState();
  const [myLinks, setMyLinks] = useState([]);

  const update = () => {};

  useEffect(() => {
    axios.post("/shorts", { id: myId }).then((res) => setMyLinks(res.data));
  }, [short, update]);

  const submit = (e) => {
    e.preventDefault();

    if (!url) return;

    axios
      .post("/", {
        url,
        id: myId,
      })
      .then((res) => {
        setShort(`http://localhost:3000/${res.data.short}`);
      });

    setUrl("");
  };

  return (
    <div className="core">
      <img src="linker.png" alt="" />
      <form>
        <input
          type="text"
          placeholder="URL"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          type="submit"
          className="button"
          endIcon={<LinkIcon />}
          onClick={submit}
        >
          Shrink
        </Button>
      </form>
      <div className="shrinked">
        <div className="url">
          <span>{short}</span>
          <CopyToClipboard text={short} className="copy">
            <AssignmentOutlinedIcon className="icon" />
          </CopyToClipboard>
        </div>
      </div>
      <div className="mylinks">
        {myLinks.length > 0 && <div className="head">My links</div>}
        {/*  */}
        {myLinks.map((link) => (
          <Link shorten={link.short} full={link.full} update={update} />
        ))}

        {/*  */}
      </div>
    </div>
  );
}

export default Core;
