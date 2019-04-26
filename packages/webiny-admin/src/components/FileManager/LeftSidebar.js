// @flow
import React from "react";
import { Query } from "react-apollo";
import { listTags } from "./graphql";
import { get } from "lodash";
import { css } from "emotion";
import { Icon } from "webiny-ui/Icon";
import styled from "react-emotion";

import { ReactComponent as TagIcon } from "./icons/round-label-24px.svg";

const style = {
    leftDrawer: css({
        float: "left",
        background: "white",
        display: "inline-block",
        width: 250,
        height: "100%",
        padding: 10
    }),
    noTagged: css({
        paddingTop: 100,
        textAlign: "center"
    })
};

const TagList = styled("div")({
    display: "flex",
    flexDirection: "column"
});

const Tag = styled("div")({
    display: "flex",
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    cursor: "pointer",
    paddingLeft: 15,
    svg: {
        color: "var(--mdc-theme-on-surface)",
        marginRight: 10
    },
    "&:hover": {
        backgroundColor: "var(--mdc-theme-background)"
    }
});

function LeftSidebar({ onTagClick }) {
    return (
        <div className={style.leftDrawer}>
            <Query query={listTags}>
                {({ data }) => {
                    const list = get(data, "files.listTags") || [];

                    if (!list.length) {
                        return (
                            <div className={style.noTagged}>
                                Once you tag an image, the tag will be displayed here.
                            </div>
                        );
                    }

                    return (
                        <TagList>
                            {list.map((item, index) => (
                                <Tag key={item + index} onClick={() => onTagClick(item)}>
                                    <Icon icon={<TagIcon />} /> {item}
                                </Tag>
                            ))}
                        </TagList>
                    );
                }}
            </Query>
        </div>
    );
}

export default LeftSidebar;
