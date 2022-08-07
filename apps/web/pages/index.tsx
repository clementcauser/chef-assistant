import { Button } from "@chef-assistant/uikit";

function Index() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="block text-indigo-600">
            Start your free trial today.
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="mb-0 mt-auto">
            <Button status="primary" variant="outlined" size="small">
              Get started
            </Button>
          </div>
          <div className="ml-3 mb-0 mt-auto">
            <Button status="success" variant="outlined" size="medium">
              Learn more
            </Button>
          </div>
          <div className="ml-3 mb-0 mt-auto">
            <Button status="danger" variant="outlined" size="large">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
