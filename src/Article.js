import { useEffect, useState } from 'react';
import { Button, Card, Modal } from 'antd';
import {
  InfoCircleOutlined,
  LoadingOutlined,
  EyeOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import moment from 'moment';

function Article({ articleData }) {
  const [expandArticleInfo, setExpandArticleInfo] = useState(false);
  const [articleInfo, setArticleInfo] = useState({});
  const baseWikiArticleURL =
    'https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=';
  const baseWikiArticleViewURL = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/${articleData.article}/daily/`;

  useEffect(() => {
    setArticleInfo({});
  }, [articleData]);

  function handleArticleClick() {
    if (expandArticleInfo) {
      setExpandArticleInfo(false);
    }
    if (Object.keys(articleInfo).length === 0) {
      setArticleInfo('loading');
      const todayDate = moment().format('YYYYMMDD');
      const monthAgoDate = moment().subtract(30, 'days').format('YYYYMMDD');
      Promise.all([
        fetch(`${baseWikiArticleURL}${articleData.article}`).then((value) =>
          value.json()
        ),
        fetch(`${baseWikiArticleViewURL}${monthAgoDate}/${todayDate}`).then(
          (value) => value.json()
        ),
      ])
        .then((allResponses) => {
          const articleInfoData = allResponses[0];
          const articleID = Object.keys(articleInfoData.query.pages);
          const articleViewdata = allResponses[1];
          const entriesSorted = articleViewdata.items.sort((a, b) => {
            return a.views < b.views ? 1 : -1;
          });

          setArticleInfo({
            ...articleInfoData.query.pages[articleID[0]],
            topThreeViewDays: entriesSorted.slice(0, 3),
          });
          setExpandArticleInfo(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setExpandArticleInfo(true);
    }
  }

  function articleStateIcon() {
    if (articleInfo === 'loading') {
      return <LoadingOutlined />;
    } else {
      return <InfoCircleOutlined />;
    }
  }
  return (
    <Card
      size='small'
      title={
        <p style={{ fontSize: '18px', textAlign: 'center' }}>
          {articleData.article.replaceAll('_', ' ')}
        </p>
      }
      style={{ width: 280 }}
    >
      <div>
        <div className='cardContent'>
          <h2>
            <EyeOutlined /> {articleData.views.toLocaleString('en-US')}
          </h2>
          <Button onClick={handleArticleClick} icon={articleStateIcon()}>
            More info
          </Button>
        </div>
        <Modal
          title={articleInfo.title}
          visible={expandArticleInfo}
          onCancel={() => setExpandArticleInfo(false)}
          footer={
            <Button onClick={() => setExpandArticleInfo(false)}>Close</Button>
          }
        >
          <div>
            <p>{articleInfo.extract}</p>
            <br />
            <h3>Top views:</h3>
            <hr />
            <ul>
              {articleInfo.topThreeViewDays?.map((item, index) => {
                return (
                  <li key={index}>
                    <div className='topThreeViewDaysRow'>
                      <EyeOutlined /> {item.views.toLocaleString('en-US')}
                      <CalendarOutlined />{' '}
                      {moment(item.timestamp, 'YYYYMMDDHH').format(
                        'MM/DD/YYYY'
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Modal>
      </div>
    </Card>
  );
}

export default Article;
