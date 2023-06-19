import addEventListener from '../vc-util/Dom/addEventListener';
import supportsPassive from '../_util/supportsPassive';
export function getTargetRect(target) {
  return target !== window ? target.getBoundingClientRect() : {
    top: 0,
    bottom: window.innerHeight
  };
}
export function getFixedTop(placeholderRect, targetRect, offsetTop) {
  if (offsetTop !== undefined && targetRect.top > placeholderRect.top - offsetTop) {
    return "".concat(offsetTop + targetRect.top, "px");
  }
  return undefined;
}
export function getFixedBottom(placeholderRect, targetRect, offsetBottom) {
  if (offsetBottom !== undefined && targetRect.bottom < placeholderRect.bottom + offsetBottom) {
    var targetBottomOffset = window.innerHeight - targetRect.bottom;
    return "".concat(offsetBottom + targetBottomOffset, "px");
  }
  return undefined;
}
// ======================== Observer ========================
var TRIGGER_EVENTS = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'];
var observerEntities = [];
export function getObserverEntities() {
  // Only used in test env. Can be removed if refactor.
  return observerEntities;
}
export function addObserveTarget(target, affix) {
  if (!target) return;
  var entity = observerEntities.find(function (item) {
    return item.target === target;
  });
  if (entity) {
    entity.affixList.push(affix);
  } else {
    entity = {
      target: target,
      affixList: [affix],
      eventHandlers: {}
    };
    observerEntities.push(entity);
    // Add listener
    TRIGGER_EVENTS.forEach(function (eventName) {
      entity.eventHandlers[eventName] = addEventListener(target, eventName, function () {
        entity.affixList.forEach(function (targetAffix) {
          var lazyUpdatePosition = targetAffix.exposed.lazyUpdatePosition;
          lazyUpdatePosition();
        }, (eventName === 'touchstart' || eventName === 'touchmove') && supportsPassive ? {
          passive: true
        } : false);
      });
    });
  }
}
export function removeObserveTarget(affix) {
  var observerEntity = observerEntities.find(function (oriObserverEntity) {
    var hasAffix = oriObserverEntity.affixList.some(function (item) {
      return item === affix;
    });
    if (hasAffix) {
      oriObserverEntity.affixList = oriObserverEntity.affixList.filter(function (item) {
        return item !== affix;
      });
    }
    return hasAffix;
  });
  if (observerEntity && observerEntity.affixList.length === 0) {
    observerEntities = observerEntities.filter(function (item) {
      return item !== observerEntity;
    });
    // Remove listener
    TRIGGER_EVENTS.forEach(function (eventName) {
      var handler = observerEntity.eventHandlers[eventName];
      if (handler && handler.remove) {
        handler.remove();
      }
    });
  }
}