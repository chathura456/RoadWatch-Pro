

import {
  MdAdminPanelSettings,
  MdCloudUpload,
  MdDashboard,
  MdEditLocation,
  MdInfo,
  MdLogout,
  MdManageHistory,
  MdOutlineSettings,
  MdVideoCameraBack
} from "react-icons/md"; // Ensure react-icons is installed

import MenuLink from "@/app/ui/dashobard/sidebar/menuLink/menuLink";
import Image from "next/image";
import styles from "./sidebar.module.css";
import avatar from "/public/avatar.jpg";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Violation Detection",
        path: "/dashboard/detection",
        icon: <MdCloudUpload />,
      },
      {
        title: "History",
        path: "/dashboard/history",
        icon: <MdManageHistory />,
      },
      {
        title: "Manage Cameras",
        path: "/dashboard/cameras",
        icon: <MdVideoCameraBack />,
      },
      {
        title: "Manage Areas",
        path: "/dashboard/areas",
        icon: <MdEditLocation />,
      },
      {
        title: "GuideLines",
        path: "/dashboard/guidelines",
        icon: <MdInfo />,
      },

    ],
  },
  {
    title: "UserSettings",
    list: [
      {
        title: "Manage Users",
        path: "/dashboard/admin_users",
        icon: <MdAdminPanelSettings />,
      },
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className={styles.container}>
    <div className={styles.user}>
      <Image className={styles.userImage} src={avatar} alt="" width="50" height="50"/>
      <div className={styles.userDetails}>
        <span className={styles.userName}>John Doe</span>
        <span className={styles.userRole}>Administrator</span>
      </div>
    </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
          
              <MenuLink item={item} key={item.title}/>
            ))}
          </li>
        ))}
      </ul>
      <button className={styles.logout}>
       <MdLogout />
       Logout
      </button>
    </div>
  );
};

export default Sidebar;
