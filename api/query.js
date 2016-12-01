var Path = require('path');
var Queries = require(Path.join(__dirname, 'queries.js'));

var query = {

    // *** use this as standard example ***
    createClient: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            payload = JSON.parse(payload.expression);
            var data = Queries.createClient(payload);
            // unstringify the data passed in
            client.query(data.string, data.params, function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    // gets called in service.js by Query module
    getAllCaseManagers: function (postgres, payload, callback) {

        // generally, this function and everything in it acquires a client
        // runs a query on the client, and then returns the client to the pool
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err); // this is basically the function that is
                // carried all the way down the pipeline from api.js
                // it is now used at the very bottom
            }

            // retrieves the queryString from getAllCaseManagers function in queries.js
            // err and result are coming from the database response
            // this is where the database connects to the backend, but we don't know
            // what the database is returning
            // query is executed once connection is established and
            // PostgreSQL server is ready for a query
            client.query(Queries.getAllCaseManagers(), function (err, result) {
                done(); // releases the client back to the pool
                if (err) {
                    return callback(err);
                }
                // 'result' contains a property 'rows' which has the returned
                // table rows from the query
                return callback(undefined, result);
                // sending result all the way back up the pipeline
                // eventually gets to respond.js
            });

            /* the 'callback' function above is really

                    function (err, result) {
                        if (err) {
                            Respond.failedToGetAllCaseManagers(reply, err);
                        } else {
                            Respond.getAllCaseManagers(reply, result);
                        }
                    }

                from api.js
            */
        });
    },


    getClient: function (postgres, clientID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getClient(clientID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    searchClient: function (postgres, firstName, lastName, callback) {
        postgres.connect(function (err, client, done){
            if (err) {
                return callback(err);
            }
            client.query(Queries.searchClient(firstName, lastName), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }
                return callback(undefined, result);
            });
        });
    },
    getClients: function (postgres, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.getClients(), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getDropIns: function (postgres, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getDropIns(), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getDropIn: function (postgres, dropin, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.getDropIn(dropin), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    createDropIn: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            payload = JSON.parse(payload.expression);
            var data = Queries.createDropIn(payload);
            // unstringify the data passed in
            client.query(data.string, data.params, function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getDropinActivities: function (postgres, dropin, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getDropinActivities(dropin), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getDropinEnrollment: function (postgres, dropinID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getDropinEnrollment(dropinID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getAllActivities: function (postgres, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getAllActivities(), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getActivity: function (postgres, activity, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getActivity(activity), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    createDropInActivities: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.createDropInActivities(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getActivityDropIns: function (postgres, activity, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getActivityDropIns(activity), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    createActivity: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            payload = JSON.parse(payload.expression);
            var data = Queries.createActivity(payload);

            client.query(data.string, data.params, function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    editActivity: function(postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.editActivity(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    enroll: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            var parsedPayload = JSON.parse(payload.expression);
            client.query(Queries.enroll(parsedPayload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getEnrollmentByActivity: function (postgres, activityID, callback) {
        postgres.connect(function (err, client, done) {
            client.query(Queries.getEnrollmentByActivity(activityID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    editClient: function(postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.editClient(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    dataBrowserGetClients: function (postgres, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.dataBrowserGetClients(), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    dataBrowserSearchClients: function (postgres, data, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.dataBrowserSearchClients(data), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    checkin: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.checkin(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    createCaseNote: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.createCaseNote(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getCheckIn: function (postgres, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.getCheckIn(), function (err, result) {

                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getClientCaseNotes: function (postgres, clientID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getClientCaseNotes(clientID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    editCaseNote: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.editCaseNote(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getUserList: function (postgres, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getUserList(), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getUserByUsername: function (postgres, username, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getUserByUsername(username), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getUserById: function (postgres, userId, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getUserById(userId), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    createUser: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.createUser(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getUsersNotifications: function (postgres, credentials, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getUsersNotifications(credentials), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    changeUserPassword: function (postgres, userId, hashedPassword, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.changeUserPassword(userId, hashedPassword), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    createCasePlan: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.createCasePlan(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getCasePlan: function (postgres, clientID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getCasePlan(clientID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    editCasePlan: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.editCasePlan(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    // getClient: function (postgres, payload, callback) {
    //     postgres.connect(function (err, client, done) {
    //         if (err) {
    //             return callback(err);
    //         }

    //         client.query(Queries.getClient(payload), function (err, result) {
    //             done();
    //             if (err) {
    //                 return callback(err);
    //             }

    //             return callback(undefined, result);
    //         });
    //     });
    // },


    // createProfile: function (postgres, payload, callback) {
    //     var queryString = 'CALL spfy.insert_profile(';

    //     queryString += parseProperty(payload.username) + ',';
    //     queryString += parseProperty(payload.password) + ',';
    //     queryString += parseProperty(payload.firstName) + ',';
    //     queryString += parseProperty(payload.lastName) + ',';
    //     queryString += parseProperty(payload.position);

    //     queryString += ')';

    //     postgres.connect(function (err, client, done) {
    //         if (err) {
    //             return callback(err);
    //         }

    //         client.query(Queries.createProfile(payload), function (err, result) {
    //             done();
    //             if (err) {
    //                 return callback(err);
    //             }

    //             return callback(undefined, result);
    //         });
    //     });
    // },
    // getCaseManagerClients: function (postgres, payload, callback) {
    //     var queryString = 'CALL spfy.get_case_manager_clients(';

    //     queryString += parseProperty(payload.caseManagerID) + ')';

    //     mysql.query(queryString, function (err, rows, fields) { // eslint-disable-line
    //         if (err) {
    //             return callback(err);
    //         }
    //         callback(undefined, rows);
    //     });
    // },
    // searchCaseManagerClients: function (postgres, payload, callback) {
    //     var queryString = 'CALL spfy.search_case_manager_clients(';

    //     queryString += parseProperty(payload.caseManagerID) + ',';
    //     queryString += parseProperty(payload.clientID) + ')';

    //     mysql.query(queryString, function (err, rows, fields) { // eslint-disable-line
    //         if (err) {
    //             return callback(err);
    //         }
    //         callback(undefined, rows);
    //     });
    // }
};

module.exports = query;
