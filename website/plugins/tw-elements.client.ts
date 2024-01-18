  import {
  initTE,
  Modal,
  Ripple,
  Dropdown,
  Datatable,
  Select,
  Tab,
  Input,
  Sidenav,
  Datepicker,
  Timepicker,
  Datetimepicker,
  Toast,
  Carousel,
  Popover,
  Alert,
  Animate,
  Popconfirm,
  Chip
} from "tw-elements";

export default defineNuxtPlugin(() => ({
  provide: { 
    initTE, Dropdown, Modal, Ripple, Datatable, Select, Tab, Input, Sidenav, Datepicker, 
    Timepicker, Datetimepicker, Toast, Carousel, Popover, Alert, Animate, Popconfirm, Chip
  }
}));