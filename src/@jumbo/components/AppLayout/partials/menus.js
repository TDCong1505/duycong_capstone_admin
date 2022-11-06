import React from 'react';

import { childPath } from 'helpers/buildUrl';

import { PostAdd } from '@material-ui/icons';

import IntlMessages from '../../../utils/IntlMessages';
import { ArrowForward } from '@material-ui/icons';

const userManage = {
  name: <IntlMessages id={'sidebar.userManager'} />,
  type: 'collapse',
  children: [
    {
      name: <IntlMessages id={'sidebar.listUser'} />,
      icon: <ArrowForward />,
      type: 'item',
      link: childPath.user,
    },
    {
      name: <IntlMessages id={'sidebar.userRole'} />,
      icon: <ArrowForward />,
      type: 'item',
      link: childPath.fjobUserRole,
    },
    {
      name: <IntlMessages id={'sidebar.userIdentification'} />,
      icon: <ArrowForward />,
      type: 'item',
      link: childPath.userIdentification,
    },
  ],
};

const JobManage = {
  name: <IntlMessages id={'sidebar.jobManager'} />,
  type: 'collapse',
  children: [
    {
      name: <IntlMessages id={'sidebar.listJob'} />,
      icon: <ArrowForward />,
      type: 'item',
      link: childPath.jobPost,
    },
  ],
};

const BlogManage = {
  name: <IntlMessages id={'sidebar.blogManager'} />,
  type: 'collapse',
  children: [
    {
      name: <IntlMessages id={'sidebar.listBlog'} />,
      icon: <ArrowForward />,
      type: 'item',
      link: childPath.fjobNew,
    },
    {
      name: <IntlMessages id={'sidebar.declareListCategory'} />,
      icon: <ArrowForward />,
      type: 'item',
      link: childPath.fjobNewCategory,
    },
  ],
};

const SettingManage = {
  name: <IntlMessages id={'sidebar.settingManager'} />,
  type: 'collapse',
  children: [
    {
      name: <IntlMessages id={'sidebar.listSetting'} />,
      icon: <ArrowForward />,
      type: 'item',
      link: childPath.fjobSetting,
    },
  ],
};
const MailSupportManage = {
  name: <IntlMessages id={'sidebar.mailSupportManage'} />,
  type: 'collapse',
  children: [
    {
      name: <IntlMessages id={'sidebar.listMail'} />,
      icon: <ArrowForward />,
      type: 'item',
      link: childPath.fjobMailSupport,
    },
  ],
};
export const sidebarNavs = [
  {
    name: <IntlMessages id={'sidebar.view'} />,
    type: 'section',
    children: [userManage, JobManage, BlogManage, SettingManage, MailSupportManage],
  },
];

export const horizontalDefaultNavs = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/sample-page',
      },
    ],
  },
];

export const minimalHorizontalMenus = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/sample-page',
      },
    ],
  },
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/sample-page',
      },
    ],
  },
];
