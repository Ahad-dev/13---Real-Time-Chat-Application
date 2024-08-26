import moment from 'moment';

export function formatDateTimeMoment(date) {
  return moment(date).format('MMMM Do, YYYY, h:mm A');
}
