import React from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';

export const EnhancedTableHead = props => {
  const { classes, order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              style={{ fontSize: '14px', paddingLeft: '25px' }}
              align="center"
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
export const getComparator = (order, orderBy) => {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

export const useStyles = makeStyles(theme => ({
  root: {
    width: 'auto',
    borderRadius: "10px",
  },
  paper: {
    padding: '0 0 20px 0',
    borderRadius: "10px",
    marginBottom: theme.spacing(4),
    backgroundColor: lighten(theme.palette.background.paper, 0.1),
    width: 'auto',
    
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 0,
    width: 1,
  },
  toolTip: {
    display: 'block',
    textOverflow: 'ellipsis',
    width: '100px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  input: {
    display: 'flex',
    padding: '0 10%',
  },
  label: {
    display: 'flex',
    padding: '0 10%',
    justifyContent: 'flexStart',
    fontWeight: 'bold',
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 200,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const EnhancedTableToolbar = props => {
  return null;
};

EnhancedTableToolbar.propTypes = {
  rowData: PropTypes.array.isRequired,
};
