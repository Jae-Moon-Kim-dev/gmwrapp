import { adminMenuInfo } from "@/app/types/admin/admin";
import { AdminMenu } from "@/app/types/common/common";
import { adminMenuStore } from "@/stores/adminMenuStore";

export const handleSelectedMenu = (url: string | undefined) => {
      let selectedMenu:AdminMenu | undefined = adminMenuInfo.find(a => {
          const { children } = a;
          const selNode =  children.filter(a => a.url === url);
  
          if ( selNode && !!selNode.length ) {
              return true;
          } else {
              return false;
          }
      });
  
      if ( selectedMenu ) {
          let childrenMenus:AdminMenu[] = selectedMenu?.children.map(a => {
              if ( a.url === url ) {
                  return {
                      ...a,
                      active: true
                  }
              } else {
                  return {
                      ...a,
                      active: false
                  }
              }
          });
      
          selectedMenu = {
              ...selectedMenu,
              children: childrenMenus,
          }
      
          adminMenuStore.getState().setMenu(selectedMenu);
      }
  };