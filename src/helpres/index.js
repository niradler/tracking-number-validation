import config from '../config'

const courier_info =  config.courier_info;

const get_courier_by_tr = (tr) => {
    for (const key in courier_info) {
        const courier = courier_info[key]
        if (courier.test(tr)) {
            return key;
        }
    }
    return null;
}

const tr_is_valid = (tr, type) => {
    for (const key in courier_info) {
        const courier = courier_info[key]
        if (courier.test(tr) && key === type.toLowerCase()) {
            return true;
        }
    }
    return false;
}
export default {
    get_courier_by_tr,
    tr_is_valid
}