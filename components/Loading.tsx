import React from "react";
import { LoadingOverlay } from "@mantine/core";

export default function Loading() {
    return (
        <div>
            <LoadingOverlay
                loaderProps={{ size: "xl", color: "red", variant: "oval" }}
                visible={true}
                overlayBlur={1}
            />
        </div>
    );
}
