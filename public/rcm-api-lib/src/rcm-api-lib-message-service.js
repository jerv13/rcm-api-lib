/**
 * {RcmApiLibMessageService}
 * @param angular
 * @param rcmApiLibApiMessage
 * @param EventManagerClass
 * @constructor
 */
var RcmApiLibMessageService = function (
    angular,
    rcmApiLibApiMessage,
    EventManagerClass
) {

    /**
     * self
     */
    var self = this;

    /**
     *
     * @type {RcmApiLibEventManager|*}
     */
    var eventManager = new EventManagerClass();

    /**
     * defaultNamespace
     * @type {string}
     */
    var defaultNamespace = 'DEFAULT';

    /**
     * messages
     * @type {{}}
     */
    self.messages = {};

    /**
     * getEventManager
     * @returns {RcmApiLibEventManager}
     */
    self.getEventManager = function () {
        return eventManager;
    };

    /**
     * getDefaultNamespace
     * @returns {string}
     */
    self.getDefaultNamespace = function () {
        return defaultNamespace;
    };

    /**
     * getNamespace
     * @param namespace
     * @returns {*}
     */
    var getNamespace = function (namespace) {
        if (typeof namespace !== 'string') {
            namespace = defaultNamespace
        }
        return namespace;
    };

    /**
     * addNamespaceMessage
     * @param namespace
     * @param message
     */
    var addNamespaceMessage = function (namespace, message) {
        namespace = self.createNamespace(namespace);
        self.messages[namespace].push(message);
        eventManager.trigger(
            'rcmApiLibApiMessage.addMessage',
            {
                namespace: namespace,
                message: message
            }
        );
    };

    /**
     * getNamespaceMessages
     * @param namespace
     * @returns {*}
     */
    var getNamespaceMessages = function (namespace) {
        namespace = getNamespace(namespace);
        if (!self.messages[namespace]) {
            return [];
        }

        return self.messages[namespace];
    };

    /**
     * clearNamespaceMessages
     * @param namespace
     */
    var clearNamespaceMessages = function (namespace) {
        namespace = getNamespace(namespace);

        self.messages[namespace] = [];
        eventManager.trigger('rcmApiLibApiMessage.clearMessages', namespace);
    };

    /**
     * createNamespace
     * @param namespace
     */
    self.createNamespace = function (namespace) {
        namespace = getNamespace(namespace);
        if (!self.messages[namespace]) {
            self.messages[namespace] = []
        }
        eventManager.trigger('rcmApiLibApiMessage.createNamespace', namespace);
        return namespace;
    };

    /**
     * hasMessages
     * @param namespace
     * @returns {boolean}
     */
    self.hasMessages = function (namespace) {
        var messages = getNamespaceMessages(namespace);
        return (messages.length <= 0);
    };

    /**
     * isValidMessage
     * @param message
     * @returns boolean
     */
    self.isValidMessage = function (message) {
        if (!message) {
            return false;
        }
        return (message.type && message.source);
    };

    /**
     * setMessage
     * @param message
     * @param namespace
     */
    self.setMessage = function (message, namespace) {
        self.clearMessages(namespace);
        self.addMessage(message, namespace);
    };

    /**
     * setMessages
     * @param messages
     * @param namespace
     */
    self.setMessages = function (messages, namespace) {
        self.clearMessages(namespace);
        self.addMessages(messages, namespace)
    };

    /**
     * addMessage
     * @param message
     * @param namespace
     */
    self.addMessage = function (message, namespace) {
        if (!self.isValidMessage(message)) {
            console.warn(
                "rcmApiLibApiMessage.addMessage received an invalid message",
                message
            );
            return;
        }
        message = angular.extend(new rcmApiLibApiMessage(), message);

        addNamespaceMessage(namespace, message);
    };

    /**
     * addMessages
     * @param messages
     * @param namespace
     */
    self.addMessages = function (messages, namespace) {
        angular.forEach(
            messages,
            function (message, key) {
                self.addMessage(message, namespace);
            }
        );
        eventManager.trigger(
            'rcmApiLibApiMessage.addMessages',
            {
                namespace: namespace,
                messages: self.getMessages(namespace)
            }
        );
    };

    /**
     * getMessages
     * @param namespace
     * @returns {[]}
     */
    self.getMessages = function (namespace) {
        return getNamespaceMessages(namespace);
    };

    /**
     * setPrimaryMessage
     * @param messages
     * @param namespace
     * @param callback
     */
    self.setPrimaryMessage = function (messages, namespace, callback) {
        self.getPrimaryMessage(
            messages,
            function (primaryMessage) {
                if (primaryMessage) {
                    self.setMessage(primaryMessage, namespace);
                    if (typeof callback === 'function') {
                        callback(primaryMessage)
                    }
                }
            }
        )
    };

    /**
     * addPrimaryMessage
     * @param messages
     * @param namespace
     * @param callback
     */
    self.addPrimaryMessage = function (messages, namespace, callback) {
        self.getPrimaryMessage(
            messages,
            function (primaryMessage) {
                if (primaryMessage) {
                    self.addMessage(primaryMessage, namespace);
                    if (typeof callback === 'function') {
                        callback(primaryMessage)
                    }
                }
            }
        )
    };

    /**
     * buildPrimaryMessage
     * @param messages
     * @param namespace
     * @param callback
     */
    self.buildPrimaryMessage = function (messages, namespace, callback) {
        self.addPrimaryMessage(messages, namespace, callback);
    };

    /**
     * clearMessages
     * @param namespace
     */
    self.clearMessages = function (namespace) {
        clearNamespaceMessages(namespace);
    };

    /**
     * getDefaultMessage
     * @returns {rcmApiLibApiMessage}
     */
    self.getDefaultMessage = function () {
        return new rcmApiLibApiMessage();
    };

    /**
     * getPrimaryMessage
     * @param messages
     * @param callback
     */
    self.getPrimaryMessage = function (messages, callback) {
        var primaryMessage = null;

        if (messages) {
            primaryMessage = messages[0];
        }

        if (typeof callback === 'function') {
            callback(primaryMessage)
        }
        return primaryMessage;
    };

    /**
     * getTypeMessages
     * @param messages
     * @param type
     * @param callback
     * @returns {"source": "value"}
     */
    self.getTypeMessages = function (messages, type, callback) {
        var typeMessages = {};

        angular.forEach(
            messages,
            function (message, key) {
                if (message.type == type) {
                    if (this[message.source] === undefined) {
                        this[message.source] = [];
                    }
                    this[message.source].push(message.value);
                }
            },
            typeMessages
        );

        if (typeof callback === 'function') {
            callback(typeMessages);
        }
        return typeMessages;
    };
};

/**
 * rcmApiLibMessageService
 */
angular.module('rcmApiLib').factory(
    'rcmApiLibMessageService',
    [
        'rcmApiLibApiMessage',
        function (
            rcmApiLibApiMessage
        ) {
            return new RcmApiLibMessageService(
                angular,
                rcmApiLibApiMessage,
                RcmApiLibEventManager
            );
        }
    ]
);
