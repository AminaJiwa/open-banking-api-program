import React from "react";
import scss from "../pages/Home.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import { Paper, useTheme } from "@mui/material";
import Link from "next/link";
import styled from "@emotion/styled";

const Footer = () => {
  const { data: session } = useSession();
  const theme = useTheme();

  const FooterLink = styled(Link)`
    color: ${theme.palette.text.primary};
  `;

  return (
    <footer className={scss.footer}>
      <Paper sx={{ width: "100%" }} color={"#262626"}>
        <ul role="menu">
          <li role="menuitem">
            <FooterLink href={"/"}>Home</FooterLink>
          </li>
          <li role="menuitem">
            <FooterLink href={"/dashboard/data"}>Data</FooterLink>
          </li>
          <li role="menuitem">
            <FooterLink href={"/dashboard/profile"}>Profile</FooterLink>
          </li>
          <li role="menuitem">
            <FooterLink href={"/dashboard/settings"}>Settings</FooterLink>
          </li>
          <li role="menuitem">
            <FooterLink href={"/#termsandconditions"}>
              Terms & Conditions
            </FooterLink>
          </li>
          <li role="menuitem">
            <FooterLink href={"/#accessibilitystatement"}>
              Accessibility statement
            </FooterLink>
          </li>
          <li role="menuitem">
            <Button
              variant={"text"}
              color={session ? "error" : "success"}
              onClick={() => (session ? signOut() : signIn())}
            >
              {session ? "Sign Out" : "Sign In"}
            </Button>
          </li>
        </ul>
      </Paper>
    </footer>
  );
};

export default Footer;