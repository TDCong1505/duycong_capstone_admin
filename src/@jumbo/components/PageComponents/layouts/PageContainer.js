import React from 'react';
import Box from '@material-ui/core/Box';
import { PageBreadcrumbs, PageHeader } from '../index';
import Slide from '@material-ui/core/Slide';



const PageContainer = ({ heading, breadcrumbs, children, className, restProps }) => {

  return (
    <Slide in={true} direction="up" mountOnEnter unmountOnExit>
      <Box className={className} {...restProps}>
        {(heading || breadcrumbs) && (
          <PageHeader heading={heading}/>
        )}
        {children}
      </Box>
    </Slide>
  );
};

export default PageContainer;
