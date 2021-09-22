import React from 'react';
import './Piezas.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div className="bg-white"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} className="pieza">
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChangeTabs} aria-label="simple tabs example" className="principal">
            <Tab label="1 Cantidad" {...a11yProps(0)} />
            <Tab label="2 Peso" {...a11yProps(1)} />
            <Tab label="3 Alto" {...a11yProps(2)} />
            <Tab label="4 Ancho" {...a11yProps(3)} />
            <Tab label="5 Profundidad" {...a11yProps(4)} />
            <Tab label="6 Referencia" {...a11yProps(5)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} >
          <div className="display-contentTabPanel">
            <div>Cantidad</div>
            <label>
              <input type="number" name="quantity" className="selector" />
            </label>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="display-contentTabPanel">
            <div>Indique el peso</div>
            <label>
              <input type="number" name="weight" className="selector" />
            </label>
            <div>gr.</div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className="display-contentTabPanel">
            <div>Indique la altura</div>
            <label>
              <input type="number" name="height" className="selector" />
            </label>
            <div>cm.</div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div className="display-contentTabPanel">
            <div>Indique el ancho</div>
            <label>
              <input type="number" name="width" className="selector" />
            </label>
            <div>cm.</div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <div className="display-contentTabPanel">
            <div>Seleccione la profundidad</div>
            <label>
              <input type="number" name="z-axis" className="selector" />
            </label>
            <div>cm.</div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={5}>
          <div className="display-contentTabPanel">
            <div>ingrese una referencia</div>
            <label>
              <input type="text" name="user-ref" />
            </label>
          </div>
        </TabPanel>
      </div>
    </div>
  );
}