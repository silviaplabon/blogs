import { Tab, Tabs } from '@mui/material';

// eslint-disable-next-line react/prop-types
const CustomTab = ({tabs,selectedTab,setSelectedTab}) => {
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
      
    return (
        <Tabs
        value={selectedTab}
        onChange={handleChange}
        variant="scrollable"
        allowScrollButtonsMobile
        aria-label="Tab"
      >
        {
            // eslint-disable-next-line react/prop-types
            tabs.map((tabItem,index)=>{
                return   (<Tab pl={0} key={index} label={tabItem} />)
            })
        }
      </Tabs>
    );
};

export default CustomTab;
