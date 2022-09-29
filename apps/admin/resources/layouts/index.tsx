import React, { FC } from "react";
import AccountLayout from "./AccountLayout";
import AuthLayout from "./AuthLayout";

import DefaultLayout from "./DefaultLayout";
const layouts = {
    DefaultLayout: DefaultLayout,
    AuthLayout: AuthLayout,
    AccountLayout: AccountLayout
};


export type layout = "DefaultLayout" | "AuthLayout" | "AccountLayout";
export interface LayoutProps {
    layout: layout
    children: JSX.Element
    title: string
}

export const Layout = ({ children, layout, title }: LayoutProps) => {
layout
    let Component = layouts[layout] || React.Fragment;
    return <Component title={title}>{children}</Component>;

};
