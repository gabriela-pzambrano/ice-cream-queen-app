import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SelectOrder = ({status, changeStatus}) => {
  return (
    <Switch.Group as="div" className="flex items-center py-2">
      <Switch
        checked={status}
        onChange={() => changeStatus()}
        className={classNames(
          status ? 'bg-primary-600' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            status ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3">
        <span className="text-xs font-medium text-gray-900">Cambiar Estado</span>
        <span className="text-xs text-gray-500"> (Entregado)</span>
      </Switch.Label>
    </Switch.Group>
  )
};
export default SelectOrder;