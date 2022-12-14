import styled from "@emotion/styled";

export const Sidebar = styled.div`
  color: #b5b5b5;
  height: 100%;
  width: 250px;
  min-width: 250px;
  text-align: left;
  transition: width, left, right, 0.3s;
  position: relative;
  z-index: 1009;
  border-right: solid 1px #ddd; ;
  box-shadow: 0 5px 5px #999;
`;

export const SidebarInner = styled.div`
  background: ${({ theme }:any) => theme.colors.primary};
  color: #989898;
  height: 100%;
  position: relative;
  z-index: 101;
`;

export const SidebarLayout = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 101;
`;
export const SidebarHeader = styled.div`
  /* border-bottom: solid 1px #ddd; */
  padding: 18px 20px;
`;
export const SidebarContent = styled.div``;

export const SidebarMenu = styled.nav`
`;
export const SidebarMenuItem = styled.div`
  .innerItem {
    position: relative;
    display: flex;
    align-items: center;
    padding: .8em 1em;
    border-right: solid 3px transparent;
    cursor: pointer;
    .itemLink {
      flex: 1;
      font-size: 14px;
    }
    .icon-wrapper {
      border-radius: 50%;
      margin-right: 19px;
      font-size: 14px;
      width: 28px;
      height: 28px;
      line-height: 35px;
      text-align: center;
      display: inline-block;
      .icon {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
        i{
          font-size: 24px;

        } 
      }
    }
    &:hover {
      background-color: #222;
    }
    ${({ active }: {active: boolean}) =>
      active && 
      `background-color:#222;
       color: #fff;
       border-right: solid 3px red;
      `
      }
    .itemLink {
    }
  }
`;

export const SidebarFooter = styled.div``;
