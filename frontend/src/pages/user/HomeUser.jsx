import React, { useEffect, useState } from "react";
import { getSuggestions } from "../../services/AIService";
import { Button, Card } from "flowbite-react";
import { Spinner } from "flowbite-react";
import { useAuthContext } from "../../context/AuthContext";
function HomeUser() {
  // const [suggestion, setSuggetion] = useState("");
  const [loading, setLoading] = useState(false);

  const { dashboardData, setDashboardData } = useAuthContext();

  async function loadSugg() {
    try {
      setLoading(true);
      const sg = await getSuggestions();
      // setSuggetion(sg);
      setLoading(false);
      dashboardData(sg);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!protip) {
      loadSugg();
    }
  }, []);

  return (
    <div className="p-8">
      {loading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {!loading && protip && (
        <Card className="max-w-lg mx-auto">
          <h1 className="text-2xl font-semibold">✅ Tip of this moment</h1>
          <p className="">{protip}</p>
          <Button>Reload tip</Button>
        </Card>
      )}
    </div>
  );
}

export default HomeUser;
