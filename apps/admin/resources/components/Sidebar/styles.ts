import styled from "@emotion/styled";

export const Sidebar = styled.div`
  color: #323130;
  height: 100%;
  width: 248px;
  min-width: 248px;
  text-align: left;
  transition: width, left, right, 0.3s;
  position: relative;
  z-index: 1009;
  border-right: solid 1px #ddd; ;
`;

export const SidebarInner = styled.div`
  background: #fff;
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
  border-bottom: solid 1px #ddd;
  padding: 12px 20px;
  height: 52px;
`;
export const SidebarContent = styled.div``;

export const SidebarMenu = styled.nav`
  padding: 10px 0;
`;
export const SidebarMenuItem = styled.div`
  .innerItem {
    position: relative;
    display: flex;
    align-items: center;
    padding: 8px 35px 8px 20px;
    cursor: pointer;
    .itemLink {
      flex: 1;
    }
    .icon-wrapper {
      background-color: #ddd;
      border-radius: 50%;
      margin-right: 10px;
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
          font-size: 18px;

        } 
      }
    }
    &:hover {
      background-color: #edebe9;
    }
    ${({ active }: { active: boolean }) =>
      active && "background-color:#edebe9;"}
    .itemLink {
    }
  }
`;

export const SidebarFooter = styled.div``;
