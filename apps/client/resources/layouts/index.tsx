import React, { FC } from "react";
import AccountLayout from "./AccountLayout";
import AuthLayout from "./AuthLayout";

import DefaultLayout from "./DefaultLayout";
import ViewLayout from "./ViewLayout";

const layouts = {
    DefaultLayout: DefaultLayout,
    AuthLayout: AuthLayout,
    AccountLayout: AccountLayout,
    ViewLayout: ViewLayout
};


export type layout = "DefaultLayout" | "AuthLayout" | "AccountLayout" | "ViewLayout";

export interface LayoutProps {
    layout: layout
    children: JSX.Element
    title: string
}

export const Layout = ({ children, layout, title }: LayoutProps) => {

    let Component = layouts[layout] || React.Fragment;
    return <Component title={title}>{children}</Component>;

};
