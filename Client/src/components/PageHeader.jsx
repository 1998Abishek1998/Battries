/* eslint-disable react/prop-types */

const PageHeader = ({ title, footer, action, noFooterBackground }) => {
  return (
    <div className="container mx-auto bg-white">
      <div className="flex sm:justify-between sm:items-top flex-col sm:flex-row py-6 px-4 sm:px-6 md:px-8">
        <div>
          <label className="font-semibold text-blue-900 text-2xl">{title}</label>
        </div>
        <div className="sm:ml-10 mt-5 sm:mt-0">
          {action && action}
        </div>
      </div>
      {footer && (
        <div
          className={`${noFooterBackground ? 'bg-transparent' : 'bg-gray-100'} px-4 sm:px-6 md:px-8 flex`}
        >
          {footer}
        </div>
      )}
      <hr className="pb-4 sm:mx-6 md:mx-8 mx-4 h-1" />
    </div>
  );
};

export default PageHeader;
