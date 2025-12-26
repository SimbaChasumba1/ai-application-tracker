import { useEffect, useState } from "react";



export default function Home() {

  const [apps, setApps] = useState<any[]>([]);



  useEffect(() => {

    fetch("http://localhost:4000/applications")

      .then(res => res.json())

      .then(setApps);

  }, []);



  return (

    <main style={{ padding: 40 }}>

      <h1>AI Job Application Tracker</h1>



      <ul>

        {apps.map(app => (

          <li key={app.id}>

            {app.company} — {app.role} ({app.status})

          </li>

        ))}

      </ul>

    </main>

  );

}