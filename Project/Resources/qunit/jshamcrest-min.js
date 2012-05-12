var JsHamcrest = {
	version : "0.6.7",
	isMatcher : function(b) {
		return b instanceof JsHamcrest.SimpleMatcher
	},
	areArraysEqual : function(b, a) {
		if( b instanceof Array || a instanceof Array) {
			if(b.length != a.length)
				return !1;
			for(var c = 0; c < b.length; c++) {
				var d = b[c], e = a[c];
				if( d instanceof Array || e instanceof Array) {
					if(!JsHamcrest.areArraysEqual(d, e))
						return !1
				} else if(d != e)
					return !1
			}
			return !0
		}
		return b == a
	},
	SimpleMatcher : function(b) {
		b = b || {};
		this.matches = b.matches;
		this.describeTo = b.describeTo;
		b.describeValueTo && (this.describeValueTo = b.describeValueTo)
	},
	CombinableMatcher : function(b) {
		JsHamcrest.SimpleMatcher.apply(this, arguments);
		b = b || {};
		this.and = function(a) {
			var b = JsHamcrest.Matchers.allOf(this, a);
			return new JsHamcrest.CombinableMatcher({
				matches : b.matches,
				describeTo : function(a) {
					a.appendDescriptionOf(b)
				}
			})
		};
		this.or = function(a) {
			var b = JsHamcrest.Matchers.anyOf(this, a);
			return new JsHamcrest.CombinableMatcher({
				matches : b.matches,
				describeTo : function(a) {
					a.appendDescriptionOf(b)
				}
			})
		}
	},
	Description : function() {
		var b = "";
		this.get = function() {
			return b
		};
		this.appendDescriptionOf = function(a) {
			a && a.describeTo(this);
			return this
		};
		this.append = function(a) {null != a && (b += a);
			return this
		};
		this.appendLiteral = function(a) {
			void 0 === a ? this.append("undefined") : null === a ? this.append("null") : a instanceof Array ? this.appendValueList("[", ", ", "]", a) : "string" == typeof a ? this.append('"' + a + '"') : a instanceof Function ? this.append("Function" + (a.name ? " " + a.name : "")) : this.append(a);
			return this
		};
		this.appendValueList = function(a, b, d, e) {
			this.append(a);
			for( a = 0; a < e.length; a++)0 < a && this.append(b), this.appendLiteral(e[a]);
			this.append(d);
			return this
		};
		this.appendList = function(a, b, d, e) {
			this.append(a);
			for( a = 0; a < e.length; a++)0 < a && this.append(b), this.appendDescriptionOf(e[a]);
			this.append(d);
			return this
		}
	}
};
JsHamcrest.SimpleMatcher.prototype.describeValueTo = function(b, a) {
	a.appendLiteral(b)
};
JsHamcrest.CombinableMatcher.prototype = new JsHamcrest.SimpleMatcher;
JsHamcrest.CombinableMatcher.prototype.constructor = JsHamcrest.CombinableMatcher;
JsHamcrest.Matchers = {};
JsHamcrest.Matchers.truth = function() {
	return new JsHamcrest.SimpleMatcher({
		matches : function(b) {
			return b
		},
		describeTo : function(b) {
			b.append("truth")
		}
	})
};
JsHamcrest.Matchers.is = function(b) {JsHamcrest.isMatcher(b) || ( b = JsHamcrest.Matchers.equalTo(b));
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			return b.matches(a)
		},
		describeTo : function(a) {
			a.append("is ").appendDescriptionOf(b)
		}
	})
};
JsHamcrest.Matchers.not = function(b) {JsHamcrest.isMatcher(b) || ( b = JsHamcrest.Matchers.equalTo(b));
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			return !b.matches(a)
		},
		describeTo : function(a) {
			a.append("not ").appendDescriptionOf(b)
		}
	})
};
JsHamcrest.Matchers.equalTo = function(b) {
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			return b instanceof Array || a instanceof Array ? JsHamcrest.areArraysEqual(b, a) : a == b
		},
		describeTo : function(a) {
			a.append("equal to ").appendLiteral(b)
		}
	})
};
JsHamcrest.Matchers.anything = function() {
	return new JsHamcrest.SimpleMatcher({
		matches : function() {
			return !0
		},
		describeTo : function(b) {
			b.append("anything")
		}
	})
};
JsHamcrest.Matchers.nil = function() {
	return new JsHamcrest.SimpleMatcher({
		matches : function(b) {
			return null == b
		},
		describeTo : function(b) {
			b.appendLiteral(null)
		}
	})
};
JsHamcrest.Matchers.sameAs = function(b) {
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			return a === b
		},
		describeTo : function(a) {
			a.append("same as ").appendLiteral(b)
		}
	})
};
JsHamcrest.Matchers.raises = function(b) {
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			try {
				a()
			} catch(c) {
				if(c.name == b)
					return !0;
				throw c;
			}
			return !1
		},
		describeTo : function(a) {
			a.append("raises ").append(b)
		}
	})
};
JsHamcrest.Matchers.raisesAnything = function() {
	return new JsHamcrest.SimpleMatcher({
		matches : function(b) {
			try {
				b()
			} catch(a) {
				return !0
			}
			return !1
		},
		describeTo : function(b) {
			b.append("raises anything")
		}
	})
};
JsHamcrest.Matchers.both = function(b) {JsHamcrest.isMatcher(b) || ( b = JsHamcrest.Matchers.equalTo(b));
	return new JsHamcrest.CombinableMatcher({
		matches : b.matches,
		describeTo : function(a) {
			a.append("both ").appendDescriptionOf(b)
		}
	})
};
JsHamcrest.Matchers.either = function(b) {JsHamcrest.isMatcher(b) || ( b = JsHamcrest.Matchers.equalTo(b));
	return new JsHamcrest.CombinableMatcher({
		matches : b.matches,
		describeTo : function(a) {
			a.append("either ").appendDescriptionOf(b)
		}
	})
};
JsHamcrest.Matchers.allOf = function() {
	var b = arguments;
	b[0] instanceof Array && ( b = b[0]);
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			for(var c = 0; c < b.length; c++) {
				var d = b[c];
				JsHamcrest.isMatcher(d) || ( d = JsHamcrest.Matchers.equalTo(d));
				if(!d.matches(a))
					return !1
			}
			return !0
		},
		describeTo : function(a) {
			a.appendList("(", " and ", ")", b)
		}
	})
};
JsHamcrest.Matchers.anyOf = function() {
	var b = arguments;
	b[0] instanceof Array && ( b = b[0]);
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			for(var c = 0; c < b.length; c++) {
				var d = b[c];
				JsHamcrest.isMatcher(d) || ( d = JsHamcrest.Matchers.equalTo(d));
				if(d.matches(a))
					return !0
			}
			return !1
		},
		describeTo : function(a) {
			a.appendList("(", " or ", ")", b)
		}
	})
};
JsHamcrest.Matchers.greaterThan = function(b) {
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			return a > b
		},
		describeTo : function(a) {
			a.append("greater than ").appendLiteral(b)
		}
	})
};
JsHamcrest.Matchers.greaterThanOrEqualTo = function(b) {
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			return a >= b
		},
		describeTo : function(a) {
			a.append("greater than or equal to ").appendLiteral(b)
		}
	})
};
JsHamcrest.Matchers.lessThan = function(b) {
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			return a < b
		},
		describeTo : function(a) {
			a.append("less than ").appendLiteral(b)
		}
	})
};
JsHamcrest.Matchers.lessThanOrEqualTo = function(b) {
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			return a <= b
		},
		describeTo : function(a) {
			a.append("less than or equal to ").append(b)
		}
	})
};
JsHamcrest.Matchers.notANumber = function() {
	return new JsHamcrest.SimpleMatcher({
		matches : function(b) {
			return isNaN(b)
		},
		describeTo : function(b) {
			b.append("not a number")
		}
	})
};
JsHamcrest.Matchers.divisibleBy = function(b) {
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			return 0 === a % b
		},
		describeTo : function(a) {
			a.append("divisible by ").appendLiteral(b)
		}
	})
};
JsHamcrest.Matchers.even = function() {
	return new JsHamcrest.SimpleMatcher({
		matches : function(b) {
			return 0 === b % 2
		},
		describeTo : function(b) {
			b.append("even")
		}
	})
};
JsHamcrest.Matchers.odd = function() {
	return new JsHamcrest.SimpleMatcher({
		matches : function(b) {
			return 0 !== b % 2
		},
		describeTo : function(b) {
			b.append("odd")
		}
	})
};
JsHamcrest.Matchers.between = function(b) {
	return {
		and : function(a) {
			var c = a, d = b;
			b > a && ( c = b, d = a);
			return new JsHamcrest.SimpleMatcher({
				matches : function(a) {
					return a >= d && a <= c
				},
				describeTo : function(a) {
					a.append("between ").appendLiteral(d).append(" and ").appendLiteral(c)
				}
			})
		}
	}
};
JsHamcrest.Matchers.closeTo = function(b, a) {
	a || ( a = 0);
	return new JsHamcrest.SimpleMatcher({
		matches : function(c) {
			return 0 >= Math.abs(c - b) - a
		},
		describeTo : function(c) {
			c.append("number within ").appendLiteral(a).append(" of ").appendLiteral(b)
		}
	})
};
JsHamcrest.Matchers.zero = function() {
	return new JsHamcrest.SimpleMatcher({
		matches : function(b) {
			return 0 === b
		},
		describeTo : function(b) {
			b.append("zero")
		}
	})
};
JsHamcrest.Matchers.equalIgnoringCase = function(b) {
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			return a.toUpperCase() == b.toUpperCase()
		},
		describeTo : function(a) {
			a.append('equal ignoring case "').append(b).append('"')
		}
	})
};
JsHamcrest.Matchers.containsString = function(b) {
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			return 0 <= a.indexOf(b)
		},
		describeTo : function(a) {
			a.append('contains string "').append(b).append('"')
		}
	})
};
JsHamcrest.Matchers.startsWith = function(b) {
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			return 0 === a.indexOf(b)
		},
		describeTo : function(a) {
			a.append("starts with ").appendLiteral(b)
		}
	})
};
JsHamcrest.Matchers.endsWith = function(b) {
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			return a.lastIndexOf(b) + b.length == a.length
		},
		describeTo : function(a) {
			a.append("ends with ").appendLiteral(b)
		}
	})
};
JsHamcrest.Matchers.matches = function(b) {
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			return b.test(a)
		},
		describeTo : function(a) {
			a.append("matches ").appendLiteral(b)
		}
	})
};
JsHamcrest.Matchers.emailAddress = function() {
	var b = /^([a-z0-9_\.\-\+])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,4})+$/i;
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			return b.test(a)
		},
		describeTo : function(a) {
			a.append("email address")
		}
	})
};
JsHamcrest.Matchers.hasMember = function(b, a) {
	void 0 === a ? a = JsHamcrest.Matchers.anything() : JsHamcrest.isMatcher(a) || ( a = JsHamcrest.Matchers.equalTo(a));
	return new JsHamcrest.SimpleMatcher({
		matches : function(c) {
			return c && b in c ? a.matches(c[b]) : !1
		},
		describeTo : function(c) {
			c.append("has member ").appendLiteral(b).append(" (").appendDescriptionOf(a).append(")")
		}
	})
};
JsHamcrest.Matchers.hasFunction = function(b) {
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			return a ? b in a && a[b] instanceof Function : !1
		},
		describeTo : function(a) {
			a.append("has function ").appendLiteral(b)
		}
	})
};
JsHamcrest.Matchers.instanceOf = function(b) {
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			return !!( a instanceof b)
		},
		describeTo : function(a) {
			var c = b.name ? b.name : "a class";
			a.append("instance of ").append(c)
		}
	})
};
JsHamcrest.Matchers.typeOf = function(b) {
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			return typeof a == b
		},
		describeTo : function(a) {
			a.append("typeof ").append('"').append(b).append('"')
		}
	})
};
JsHamcrest.Matchers.object = function() {
	return new JsHamcrest.Matchers.instanceOf(Object)
};
JsHamcrest.Matchers.string = function() {
	return new JsHamcrest.Matchers.typeOf("string")
};
JsHamcrest.Matchers.number = function() {
	return new JsHamcrest.Matchers.typeOf("number")
};
JsHamcrest.Matchers.bool = function() {
	return new JsHamcrest.Matchers.typeOf("boolean")
};
JsHamcrest.Matchers.func = function() {
	return new JsHamcrest.Matchers.instanceOf(Function)
};
JsHamcrest.Matchers.hasItem = function(b) {JsHamcrest.isMatcher(b) || ( b = JsHamcrest.Matchers.equalTo(b));
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			if(!( a instanceof Array))
				return !1;
			for(var c = 0; c < a.length; c++)
			if(b.matches(a[c]))
				return !0;
			return !1
		},
		describeTo : function(a) {
			a.append("array contains item ").appendDescriptionOf(b)
		}
	})
};
JsHamcrest.Matchers.hasItems = function() {
	for(var b = [], a = 0; a < arguments.length; a++)
	b.push(JsHamcrest.Matchers.hasItem(arguments[a]));
	return JsHamcrest.Matchers.allOf(b)
};
JsHamcrest.Matchers.everyItem = function(b) {JsHamcrest.isMatcher(b) || ( b = JsHamcrest.Matchers.equalTo(b));
	return new JsHamcrest.SimpleMatcher({
		matches : function(a) {
			if(!( a instanceof Array))
				return !1;
			for(var c = 0; c < a.length; c++)
			if(!b.matches(a[c]))
				return !1;
			return !0
		},
		describeTo : function(a) {
			a.append("every item ").appendDescriptionOf(b)
		}
	})
};
JsHamcrest.Matchers.isIn = function() {
	var b = JsHamcrest.Matchers.equalTo, a = arguments;
	a[0] instanceof Array && ( a = a[0]);
	return new JsHamcrest.SimpleMatcher({
		matches : function(c) {
			for(var d = 0; d < a.length; d++)
			if(b(a[d]).matches(c))
				return !0;
			return !1
		},
		describeTo : function(b) {
			b.append("one of ").appendLiteral(a)
		}
	})
};
JsHamcrest.Matchers.oneOf = JsHamcrest.Matchers.isIn;
JsHamcrest.Matchers.empty = function() {
	return new JsHamcrest.SimpleMatcher({
		matches : function(b) {
			return 0 === b.length
		},
		describeTo : function(b) {
			b.append("empty")
		}
	})
};
JsHamcrest.Matchers.hasSize = function(b) {JsHamcrest.isMatcher(b) || ( b = JsHamcrest.Matchers.equalTo(b));
	var a = function(a) {
		var b = a.length;
		if(
		void 0 === b && "object" === typeof a) {
			var b = 0, e;
			for(e in a)
			b++
		}
		return b
	};
	return new JsHamcrest.SimpleMatcher({
		matches : function(c) {
			return b.matches(a(c))
		},
		describeTo : function(a) {
			a.append("has size ").appendDescriptionOf(b)
		},
		describeValueTo : function(b, d) {
			d.append(a(b))
		}
	})
};
JsHamcrest.Operators = {};
JsHamcrest.Operators.filter = function(b, a) {
	if(!( b instanceof Array) || null == a)
		return b;
	a instanceof JsHamcrest.SimpleMatcher || ( a = JsHamcrest.Matchers.equalTo(a));
	for(var c = [], d = 0; d < b.length; d++)a.matches(b[d]) && c.push(b[d]);
	return c
};
JsHamcrest.Operators.assert = function(b, a, c) {
	var c = c ? c : {}, d = new JsHamcrest.Description;
	null == a ? a = JsHamcrest.Matchers.truth() : JsHamcrest.isMatcher(a) || ( a = JsHamcrest.Matchers.equalTo(a));
	c.message && d.append(c.message).append(". ");
	d.append("Expected ");
	a.describeTo(d);
	a.matches(b) ? (d.append(": Success"), d.passed = !0, c.pass && c.pass(d.get())) : (d.passed = !1, d.append(" but was "), a.describeValueTo(b, d), c.fail && c.fail(d.get()));
	return d
};
JsHamcrest.Operators.callTo = function() {
	var b = [].shift.call(arguments), a = arguments;
	return function() {
		return b.apply(this, a)
	}
};
JsHamcrest.Integration = function() {
	var b = this;
	return {
		copyMembers : function(a, b) {
			if(1 == arguments.length)
				b = a, JsHamcrest.Integration.copyMembers(JsHamcrest.Matchers, b), JsHamcrest.Integration.copyMembers(JsHamcrest.Operators, b)
			else if(a)
				for(var d in a) d in b || (b[d] = a[d])
		},
		installMatchers : function(a) {
			JsHamcrest.Integration.copyMembers(a, JsHamcrest.Matchers)
		},
		installOperators : function(a) {
			JsHamcrest.Integration.copyMembers(a, JsHamcrest.Operators)
		},
		WebBrowser : function() {
			JsHamcrest.Integration.copyMembers(b);
			b.assertThat = function(a, b, d) {
				return JsHamcrest.Operators.assert(a, b, {
					message : d,
					fail : function(a) {
						alert("[FAIL] " + a)
					},
					pass : function(a) {
						alert("[SUCCESS] " + a)
					}
				})
			}
		},
		Rhino : function() {
			JsHamcrest.Integration.copyMembers(b);
			b.assertThat = function(a, b, d) {
				return JsHamcrest.Operators.assert(a, b, {
					message : d,
					fail : function(a) {
						print("[FAIL] " + a + "\n")
					},
					pass : function(a) {
						print("[SUCCESS] " + a + "\n")
					}
				})
			}
		},
		JsTestDriver : function(a) {
			function c(a) {
				a = Error(a);
				a.name = "AssertError";
				try {
					for(var b = /jshamcrest.*.js:/i, c = a.stack.split("\n"), h = "", g = 0; g < c.length; g++)b.test(c[g]) || (h += c[g] + "\n");
					a.stack = h
				} catch(i) {
				}
				throw a;
			}

			a = a ? a : {};
			a = a.scope || b;
			JsHamcrest.Integration.copyMembers(a);
			a.assertThat = function(a, b, f) {
				return JsHamcrest.Operators.assert(a, b, {
					message : f,
					fail : c
				})
			}
		},
		JsUnitTest : function(a) {
			a = a ? a : {};
			a = a.scope || JsUnitTest.Unit.Testcase.prototype;
			JsHamcrest.Integration.copyMembers(a);
			a.assertThat = function(a, b, e) {
				var f = this;
				return JsHamcrest.Operators.assert(a, b, {
					message : e,
					fail : function(a) {
						f.fail(a)
					},
					pass : function() {
						f.pass()
					}
				})
			}
		},
		YUITest : function(a) {
			a = a ? a : {};
			a = a.scope || b;
			JsHamcrest.Integration.copyMembers(a);
			a.Assert = YAHOO.util.Assert;
			YAHOO.util.Assert.that = function(a, b, e) {
				return JsHamcrest.Operators.assert(a, b, {
					message : e,
					fail : function(a) {
						YAHOO.util.Assert.fail(a)
					}
				})
			}
		},
		QUnit : function(a) {
			a = a ? a : {};
			a = a.scope || b;
			JsHamcrest.Integration.copyMembers(a);
			a.assertThat = function(a, b, e) {
				return JsHamcrest.Operators.assert(a, b, {
					message : e,
					fail : function(a) {
						QUnit.ok(!1, a)
					},
					pass : function(a) {
						QUnit.ok(!0, a)
					}
				})
			}
		},
		jsUnity : function(a) {
			var a = a ? a : {}, b = a.scope || jsUnity.env.defaultScope, a = a.attachAssertions || !1;
			JsHamcrest.Integration.copyMembers(b);
			a && jsUnity.attachAssertions(b);
			b.assertThat = function(a, b, c) {
				return JsHamcrest.Operators.assert(a, b, {
					message : c,
					fail : function(a) {
						throw a;
					}
				})
			}
		},
		screwunit : function(a) {
			a = a ? a : {};
			a = a.scope || Screw.Matchers;
			JsHamcrest.Integration.copyMembers(a);
			a.assertThat = function(a, b, e) {
				return JsHamcrest.Operators.assert(a, b, {
					message : e,
					fail : function(a) {
						throw a;
					}
				})
			}
		},
		jasmine : function(a) {
			a = a ? a : {};
			a = a.scope || b;
			JsHamcrest.Integration.copyMembers(a);
			a.assertThat = function(a, b, e) {
				return JsHamcrest.Operators.assert(a, b, {
					message : e,
					fail : function(a) {
						jasmine.getEnv().currentSpec.addMatcherResult(new jasmine.ExpectationResult({
							passed : !1,
							message : a
						}))
					},
					pass : function(a) {
						jasmine.getEnv().currentSpec.addMatcherResult(new jasmine.ExpectationResult({
							passed : !0,
							message : a
						}))
					}
				})
			}
		}
	}
}();
