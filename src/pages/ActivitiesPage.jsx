import { useMemo, useState } from 'react';
import { activityCategories, formatActivityDate, loadPublishedActivities } from '../data/activities';

function ActivitiesPage() {
  const [activeCategory, setActiveCategory] = useState('全部活动');
  const activities = useMemo(() => loadPublishedActivities(), []);

  const filteredActivities = useMemo(() => {
    if (activeCategory === '全部活动') {
      return activities;
    }

    return activities.filter((activity) => activity.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <div className="page-header">
        <h1>活动概览</h1>
        <p>Our Activities</p>
      </div>

      <section className="section">
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
          <h2 style={{ color: '#003875', fontSize: '2rem', marginBottom: '1rem' }}>精彩活动</h2>
          <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: 1.8 }}>
            延世大学中国学生学者联合会每年举办数十场丰富多彩的活动，涵盖文化交流、学术讲座、体育竞赛、节日庆典等多个领域。我们致力于为会员打造一个充满活力和温暖的社区。
          </p>
        </div>

        <div className="activity-filters">
          {activityCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={`activity-filter-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="activities-grid">
          {filteredActivities.map((activity) => (
            <article className="activity-card" key={`${activity.title}-${activity.date}`}>
              {activity.coverMode === 'image' && activity.coverImage ? (
                <img src={activity.coverImage} alt={activity.title} className="activity-image activity-image-media" />
              ) : (
                <div className="activity-image">{activity.imageText}</div>
              )}
              <div className="activity-content">
                <h3>{activity.title}</h3>
                <p className="activity-date">{activity.date ? formatActivityDate(activity.date) : ''}</p>
                <p>{activity.description}</p>
                <p style={{ marginTop: '0.75rem' }}>
                  <strong>地点：</strong>
                  {activity.location || '未填写'}
                </p>
                {activity.detailLink && activity.detailLink !== '#' && (
                  <a href={activity.detailLink} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '1rem', color: '#003875', fontWeight: 600 }}>
                    查看详细信息
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <p style={{ textAlign: 'center', marginTop: '2rem', color: '#666' }}>该分类下暂时没有活动，稍后会更新。</p>
        )}
      </section>

      <section className="section" style={{ background: '#f8f9fa', margin: 0, maxWidth: '100%', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title">精彩瞬间</h2>
          <p className="section-subtitle">Memorable Moments</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            <div style={{ height: '200px', background: 'linear-gradient(135deg, #003875 0%, #005fa3 100%)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.2rem' }}>活动照片1</div>
            <div style={{ height: '200px', background: 'linear-gradient(135deg, #003875 0%, #005fa3 100%)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.2rem' }}>活动照片2</div>
            <div style={{ height: '200px', background: 'linear-gradient(135deg, #003875 0%, #005fa3 100%)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.2rem' }}>活动照片3</div>
            <div style={{ height: '200px', background: 'linear-gradient(135deg, #003875 0%, #005fa3 100%)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.2rem' }}>活动照片4</div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ActivitiesPage;
