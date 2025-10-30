import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";

export default function App() {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <Button>Click me</Button>
      </div>
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Hello Hardness</h1>
        <p>Welcome to the beast mode UI.</p>
      </Card>
    </>
  );
}

