import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';




const data = [
  {
    subject: 'emotional', A: areas.emotional*10,B:10, fullMark: 10,
  },
  {
    subject: 'spiritual', A: areas.spiritual*10,B:10,fullMark: 10,
  },
  {
    subject: 'relatives', A: areas.relatives*10,B:10,fullMark: 10,
  },
  {
    subject: 'conjugal', A: areas.conjugal*10,B:10,fullMark: 10,
  },
  {
    subject: 'children', A: areas.children*10,B:10, fullMark: 10,
  },
  {
    subject: 'social', A: areas.social*10,B:10,fullMark: 10,
  },
  {
    subject: 'health', A: areas.health*10,B:10, fullMark: 10,
  },
  {
    subject: 'serve', A: areas.serve*10,B:10, fullMark: 10,
  },
  {
    subject: 'intelectual', A: areas.intelectual*10,B:10, fullMark: 10,
  },
  {
    subject: 'financial', A: areas.financial*10,B:10,fullMark: 10,
  },
  {
    subject: 'professional', A: areas.professional*10,B:10, fullMark: 10,
  },
];




<div className="perfil">
        
        <img src={genero()} className="jedi" alt="jedi"/>
        <h1 className="titlePerfil">{userName}</h1>
        <button onClick={logout} className="button">Logout</button>
        <h1 className="taskSearch">Tasks Diárias:{value}</h1>
        <h1 className="taskSearch">Meta Diária:{meta}</h1>
        <input type="number" onChange={e=>setMeta(e.target.value)} placeholder="Quantidade de metas"></input>
        <h1 className="taskSearch">Total Tasks:{total}</h1>
        <div className="personUl">
          <ul className="ulPersona">
            <li>emocional:{areas.emotional}</li>
            <li>espiritual:{areas.spiritual}</li>
            <li>parentes:{areas.relatives}</li>
            <li>conjugal:{areas.conjugal}</li>
            <li>filhos:{areas.children}</li>
            <li>social:{areas.social}</li>
            <li>saúde:{areas.health}</li>
            <li>servir:{areas.serve}</li>
            <li>intelectual:{areas.intelectual}</li>
            <li>financeiro:{areas.financial}</li>
            <li>profissional:{areas.professional}</li>
          </ul> 
          <RadarChart cx={130} cy={70} outerRadius={50} width={500} height={500} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis/>
          <Radar name="Mike" dataKey="A" stroke="#07C86B" fill="#07A86B" fillOpacity={0.6}/>
        </RadarChart>
        </div>
        <button className="btnPerson" onClick={config}>Config</button>
      </div> 