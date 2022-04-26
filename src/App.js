import { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, DatePicker, Dropdown, Menu, Layout, Timeline } from 'antd';
import { CodepenOutlined } from '@ant-design/icons';

import './App.css';
import 'antd/dist/antd.min.css';
import Article from './Article';

function App() {
  const { Header, Sider, Content } = Layout;
  const baseWikiURL =
    'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access';
  const [mostViewedData, setMostViewedData] = useState([]);
  const [filterMax, setFilterMax] = useState(100);
  const [selectedDate, setSelectedDate] = useState(
    moment().subtract(1, 'days')
  );

  useEffect(() => {
    fetch(`${baseWikiURL}/${selectedDate.format('YYYY/MM/DD')}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setMostViewedData(data.items[0].articles);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedDate]);

  function handleDateSelect(date) {
    setSelectedDate(date);
    console.log(date);
  }

  function handleMaxSelect({ key }) {
    setFilterMax(key);
  }
  return (
    <Layout>
      <Header
        style={{
          background: '#219EBC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <div className='logo'>
          <p>WikiViews</p>
          <CodepenOutlined height={'48px'} width={'48px'} />
        </div>
        <div>
          <DatePicker defaultValue={selectedDate} onChange={handleDateSelect} />
          <Dropdown
            trigger='click'
            overlay={
              <Menu selectedKeys={[`${filterMax}`]} onClick={handleMaxSelect}>
                <Menu.Item key='25'>25</Menu.Item>
                <Menu.Item key='50'>50</Menu.Item>
                <Menu.Item key='75'>75</Menu.Item>
                <Menu.Item key='100'>100</Menu.Item>
                <Menu.Item key='200'>200</Menu.Item>
              </Menu>
            }
            placement='bottom'
          >
            <Button>Max Results: {filterMax}</Button>
          </Dropdown>
        </div>
      </Header>
      <Layout
        style={{
          background: '#219EBC',
        }}
      >
        <Sider style={{ background: '#219EBC' }}></Sider>
        <Content
          style={{
            background: '#8ECAE6',
            borderRadius: '6px',
            overflow: 'hidden',
            padding: '24px',
            boxShadow: '5px 5px 3px 1px rgba(0,0,0,0.17)',
          }}
        >
          {mostViewedData.length > 0 && (
            <h1>Wikipedia Articles by View Count:</h1>
          )}
          <Timeline mode='alternate'>
            {mostViewedData.length > 0 ? (
              mostViewedData.slice(0, filterMax).map((item, index) => (
                <Timeline.Item
                  dot={
                    <div
                      className={`itemRank ${
                        item.rank % 2 === 0 ? 'itemRankEven' : 'itemRankOdd'
                      }`}
                    >
                      {item.rank}
                    </div>
                  }
                  key={index}
                >
                  <Article articleData={item} />
                </Timeline.Item>
              ))
            ) : (
              <p>No results.</p>
            )}
          </Timeline>
        </Content>
        <Sider style={{ background: '#219EBC' }}></Sider>
      </Layout>
    </Layout>
  );
}

export default App;
