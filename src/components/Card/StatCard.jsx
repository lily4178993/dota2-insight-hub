import PropTypes from 'prop-types';

function StatCard({ title, stats }) {
  return (
    <li className="w-4/5 md:w-60 p-2 rounded-sm text-balance border-2 border-blue-900">
      <span className="mb-4 text-2xl text-center block bg-blue-900">{title}</span>
      <ul>
        {stats.map(([name, value]) => (
          <li className="grid grid-cols-2" key={name}>
            {name}
            <span className="text-right">{value}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  stats: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default StatCard;
