#	limited-calls - Wraps a function so it will only be called once during a set delay time.
#
# MIT License
#
# Copyright (c) 2018 Dennis Raymondo van der Sluis
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#

{	forceNumber, forceBoolean
	forceFunction	}	= require 'types.js'

MISSING_FUNC_TEXT= 'limit-calls: invalid or missing function, check the first argument of limit-calls invocation.'

# in milliseconds
DELAY_DEFAULT= 100



class LimitedCalls


	constructor: ( func, delay, ignorePending ) ->
		@func						= forceFunction func, -> console.log( MISSING_FUNC_TEXT )
		@delay					= forceNumber delay, DELAY_DEFAULT
		@running					= false
		@pendingCall			= false
		@pendingCallArgs		= []
		@ignorePending			= forceBoolean ignorePending


	setPendingCall: ( args... ) ->
		return if @ignorePending
		@pendingCallArgs	= args
		@pendingCall		= true



	run: ( args... ) ->
		return @setPendingCall(args...) if @running

		@func args...
		@running= true

		setTimeout =>
			if @pendingCall
				@func @pendingCallArgs...
				@pendingCall= false
			@running= false
		, @delay



# returns a function that can be called as many times, but only executes once during the delay time
#
# the last call of calls made during the delay is executed after the delay ends
# this can be disabled by passing true for ignorePending
#
module.exports= limitedCalls= ( func, delay, ignorePending ) ->

	limitedCalls= new LimitedCalls func, delay, ignorePending
	return ( args... ) -> limitedCalls.run args...
