import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
  } from 'recharts';
  
  const BarChartComponent = ({ data }) => {
    const colors = ['#7671D6', '#89D1C9', '#4FABF5', '#7671D6', '#89D1C9', '#4FABF5', '#7671D6', '#89D1C9', '#4FABF5'];
    return (
      <div className="bg-white mt-8 flex flex-col rounded-md ">
        <h4 className="text-primary-500 font-bold text-center pt-4 text-lg">
          Gráfico de Órdenes por Fecha
        </h4>
        <ResponsiveContainer width="100%" height={530}>
          <BarChart
            data={data.slice(0,7)}
            margin={{
              top: 50,
              right: 50,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dateEntry" tick={{ fill: '#7671D6', fontSize: 12 }} />
            <YAxis
              allowDecimals={false}
              tick={{ fill: '#7671D6', fontSize: 16, fontWeight: 'bold' }}
            />
            <Tooltip />
            <Bar dataKey="count" barSize={75}>
              {data.map((d, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default BarChartComponent;
  